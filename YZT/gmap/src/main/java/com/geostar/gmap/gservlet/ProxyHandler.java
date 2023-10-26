package com.geostar.gmap.gservlet;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.geostar.gmap.tif.Signature;
import com.geostar.gmap.utils.SpringContextHolder;

/**
 * 正向代理，向网关转发请求，kvp格式
 * @author maxiaofeng
 *
 */
public class ProxyHandler extends HttpServlet implements Serializable {

	private static final long serialVersionUID = 3561079438115778584L;
	
	private final static Logger logger = LoggerFactory.getLogger(ProxyHandler.class);
	
	private static final String CHARSET_UTF8 = "UTF-8"; // 默认字符集常量 : UTF-8
	
	public static final String CONTENT_URL_NAME = "url";
	
	private GatewayConfig gatewayConfig;
	
	private BusConfig busConfig;
	
	/**
	 * SERVELT初始化
	 */
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		
		gatewayConfig = SpringContextHolder.getBean("gatewayConfig");
		busConfig = SpringContextHolder.getBean("busConfig");
	}

	/**
	 * doGet请求
	 */
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		noSecurityRequest(req, resp);
	}
	
	private void noSecurityRequest(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		
		logger.info("ProxyHandler noSecurityRequest 请求类型: GET");
		String url0 = "";
		OutputStream out = null;
		HttpURLConnection conn = null;
		// 获取请求的类型与字符集
		String requestContent = req.getContentType();
		String requestCharset = req.getCharacterEncoding();
		StringBuffer requestContentType = new StringBuffer();
		
		if (null != requestContent) {
			requestContentType.append(requestContent);
			if (null != requestCharset) {
				requestContentType.append(";charset=").append(requestCharset);
			}
		}
		
		try {
			// 获取请求参数的字符串
			url0 = req.getQueryString();
			url0 = url0.replace("+", "%2B");
			
			Map<String, String> paramValues = GetParamters(url0);
			int urlIndex = url0.indexOf("url=");
			if(urlIndex > 0) {
				url0 = url0.substring(urlIndex);
			}
			
			// 进行解码操作
			if (null != url0)
				url0 = URLDecoder.decode(url0, CHARSET_UTF8);
			if (url0.startsWith("url=")) {
				url0 = url0.substring(4);
			}
			if (url0.indexOf("requestTime") != -1) {
				url0 = url0.split("requestTime")[0];
				url0 = url0.substring(0, url0.length() - 1);
			}

		    if (url0.startsWith("tile38")) {
		    	url0 = url0.substring(6, url0.length());
		        String[] arrTemp = url0.split("\\+");
		        for (String str : arrTemp)
		          if (str.indexOf("http://") == -1)
		            url0 = url0.replace(str, URLEncoder.encode(str, "UTF-8"));
		    } else {
		    	Map<String, Object> map = toMap(url0);
		        if (map != null) {
		        	for (Map.Entry<String, Object> entry : map.entrySet()) {
		        		url0 = url0.replace((CharSequence)entry.getValue(), URLEncoder.encode((String)entry.getValue(), "UTF-8"));
		        	}
		        }
		    }
			
			// 请求转发
			URL url = new URL(url0);
			conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("GET");
			
			if(!requestContentType
					.toString().equals("") ){
				conn.setRequestProperty("Content-Type", requestContentType
						.toString());
			}

			//添加请求头，paasId与paasToken可从前端传递或者读取后端配置文件
			String paasId = "", paasToken = "";
			if(paramValues.containsKey("paasId")) {
				paasId = paramValues.get("paasId");
				paasToken = paramValues.get("paasToken");
			}else if(paramValues.containsKey("serviceCode")) { //参数包含serviceCode说明使用的是数据中台模式
				paasId = busConfig.getPaasId();
				paasToken = busConfig.getPaasToken();
			}
			else{
				paasId = gatewayConfig.getPaasId();
				paasToken = gatewayConfig.getPaasToken();
			}
			HashMap<String, String> map = Signature.computeSignatureHeaders(paasId, paasToken);
			if(paramValues.containsKey("serviceCode")) {
				map.put("x-tif-signature", map.get("x-tif-signature").toUpperCase());
				map.put("x-tif-serviceId", paramValues.get("serviceCode"));
			}
			for(String key : map.keySet()) {
				conn.setRequestProperty(key, map.get(key));
			}
			logger.info("计算网关签名为:\n"+map);
			
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setUseCaches(false);

			// 获取请求的类型与字符集设置
			String contentType = conn.getContentType();
			String encoding = conn.getContentEncoding();

			out = resp.getOutputStream();
			// 设置返回的类型与字符集
			resp.setContentType(contentType);
			resp.setHeader("Content-Encoding", encoding);//正文解压缩方式
			
			InputStream in = null;
			if(conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
				in = conn.getInputStream();
			}else {
				in = conn.getErrorStream();
			}
			out=resp.getOutputStream();
			int len = 0;
			byte[] b = new byte[1024];
			while((len=in.read(b)) >0){
				out.write(b,0,len); 
			}
			out.flush();
			
			logger.info("\n请求地址: " + url0 + "\n请求成功!");
		} catch (Exception e) {
			logger.error("请求地址: " + url0 + "\n请求失败: " + e.toString(), e);
			
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (conn != null) {
					conn.disconnect();
				}
			} catch (Exception e) {
				logger.error(e.toString(), e);
			}
		}
	}
	
	private Map<String, String> GetParamters(String queryString){
		String[] paramNames = new String[] {"serviceCode", "paasId", "paasToken"};
		Map<String, String> pramValues = new HashMap<String, String>();
		for(int i=0; i<paramNames.length; i++) {
			String paramName = paramNames[i] + "=";
			int index = queryString.indexOf(paramName);
			if(index < 0) {
				continue;
			}
			
			String value = queryString.substring(index + paramName.length(), queryString.indexOf('&', index));
			pramValues.put(paramNames[i], value);
		}
		return pramValues;
	}
	
	public Map<String, Object> toMap(String url) {
		Map<String,Object> map = null;
	    if ((url != null) && (url.indexOf("&") > -1) && (url.indexOf("=") > -1)) {
	    	map = new HashMap<String,Object>();
	    	String[] arrTemp = url.split("&");
	    	for (String str : arrTemp) {
	    		String[] qs = str.split("=", 2);
	    		if (qs[0].indexOf("http://") == -1) {
	    			if (qs.length == 2)
	    				map.put(qs[0], qs[1]);
	    		} else {
	    			String[] temp = qs[0].split("\\?");
	    			map.put(temp[(temp.length - 1)], qs[1]);
	    		}
	    	}
	    }
	    return map;
	}
	
	/**
	 * doPost请求
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		logger.info("请求类型: POST");

		OutputStream out = null;
		BufferedInputStream in = null;
		HttpURLConnection connection = null;
		String url0 = request.getQueryString();
		
		try {
			InputStream indoc = request.getInputStream();

			// 对请求参数进行解码操作
			if (null != url0)
				url0 = URLDecoder.decode(url0, CHARSET_UTF8);

			// 获取请求类型与字符集
			String requestContent = request.getContentType();
			String requestCharset = request.getCharacterEncoding();
			StringBuffer requestContentType = new StringBuffer();
			if (null != requestContent) {
				requestContentType.append(requestContent);
				if (null != requestCharset) {
					requestContentType.append(";charset=").append(requestCharset);
				}
			}

			out = response.getOutputStream();
			
			Map<String, String> paramValues = GetParamters(url0);
			int urlIndex = url0.indexOf("url=");
			if(urlIndex > 0) {
				url0 = url0.substring(urlIndex);
			}
			
			if (!url0.startsWith("url=")) {
				return;
			}
			
			String urlString = url0.substring(4);

			URL url = new URL(urlString);

			// 转发请求
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type",
					requestContentType.toString());
			
			connection.setDoInput(true);
			connection.setDoOutput(true);

			//添加请求头，paasId与paasToken可从前端传递或者读取后端配置文件
			String paasId = "", paasToken = "";
			if(paramValues.containsKey("paasId")) {
				paasId = paramValues.get("paasId");
				paasToken = paramValues.get("paasToken");
			}else {
				paasId = gatewayConfig.getPaasId();
				paasToken = gatewayConfig.getPaasToken();
			}
			HashMap<String, String> map = Signature.computeSignatureHeaders(paasId, paasToken);
			if(paramValues.containsKey("serviceCode")) {
				map.put("x-tif-signature", map.get("x-tif-signature").toUpperCase());
				map.put("x-tif-serviceId", paramValues.get("serviceCode"));
			}
			for(String key : map.keySet()) {
				connection.setRequestProperty(key, map.get(key));
			}
			
			OutputStream toserver = connection.getOutputStream();
			int l = indoc.read();
			if(l != -1) {
				do {
					toserver.write(l);
				}while((l = indoc.read()) != -1);
			}else {
				StringBuilder params = new StringBuilder();
				for(Map.Entry<String, String[]> entry: request.getParameterMap().entrySet()) {
					if(entry.getKey().equals("url")) {
						continue;
					}
					for(String value: entry.getValue()) {
						if(params.length() > 0) {
							params.append("&");
						}
						params.append(entry.getKey()).append("=").append(value);
					}
				}
				toserver.write(params.toString().getBytes());
			}
			toserver.flush();
			toserver.close();

			// 获取转发返回的类型与字符集
			String responseContentType = connection
					.getContentType();
			String responseCharset = connection
					.getContentEncoding();

			// 将转发返回的类型与字符集设置到返回的参数中
			response.setContentType(responseContentType);
			response.setCharacterEncoding(responseCharset);

			// 读取响应信息，并将响应发送到客户端
			in = new BufferedInputStream(connection
					.getInputStream());
			byte[] bs = new byte[1024];
			int startpos = 0;
			int num = 0;
			num = in.read(bs, startpos, 1024);
			logger.info("返回信息:");
			
			while (num != -1) {
				out.write(bs, 0, num);
				//logger.info(new String(bs));
				num = in.read(bs, 0, 1024);
			}
			
			logger.info("\n请求地址: " + url0 + "\n请求成功!");
		} catch (Exception e) {
			logger.error("请求地址: " + url0 + "\n请求失败!" + e.toString(), e);
		} finally {
			try {
				if(in != null) {
					in.close();
				}
				if(connection != null) {
					connection.disconnect();
				}
				if(out != null) {
					out.flush();
					out.close();
				}
			} catch (Exception ex) {
				logger.error(ex.toString(), ex);
			}
		}
	}
	
}
