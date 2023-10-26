package com.geostar.gmap.filter;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.geostar.gmap.gservlet.BusConfig;
import com.geostar.gmap.gservlet.GatewayConfig;
import com.geostar.gmap.tif.Signature;

/**
 * 使用Filter方式实现正向代理，restful格式
 * @author maxiaofeng
 *
 */
@WebFilter(urlPatterns="/gateway/*", filterName="proxyFilter")
public class ProxyFilter implements Filter{

	private final static Logger logger = LoggerFactory.getLogger(ProxyFilter.class);
	
	/**
	 * 被代理的地址
	 */
	private final String urlToProxy = "https://ztn-data.gdgov.cn:8581/GatewayMsg/http/api/proxy/invoke";
	
	private GatewayConfig gatewayConfig;
	
	private BusConfig busConfig;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(filterConfig.getServletContext());
		
		gatewayConfig = context.getBean("gatewayConfig", GatewayConfig.class);
		busConfig = context.getBean("busConfig", BusConfig.class);
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		String requestMethod = httpRequest.getMethod().toUpperCase();
		String realUrl = httpRequest.getServletPath().replace("/gateway", urlToProxy);
		if(requestMethod.equals("GET")) {
			doGet(realUrl, httpRequest, httpResponse);
		}else if(requestMethod.equals("POST")){
			doPost(realUrl, httpRequest, httpResponse);
		}else {
			sendUnSupportTip(httpResponse);
		}
	}

	/**
	 * 推送不支持提示消息
	 * @param resp
	 */
	private void sendUnSupportTip(HttpServletResponse resp) {
		OutputStream out = null;
		try {
			String data = "仅支持GET和POST请求";
			out = resp.getOutputStream();
			resp.setHeader("content-type", "text/html;charset=UTF-8");
			byte[] dataByteArr = data.getBytes("UTF-8");
			out.write(dataByteArr);
			out.flush();
		}catch(Exception ex) {
			logger.error(ex.toString(), ex);
		}finally {
			try {
				if(out != null) {	
					out.close();
				}
			} catch (IOException ex) {
				logger.error(ex.toString(), ex);
			}
		}
	}
	
	/**
	 * 处理GET请求
	 * @param req
	 * @param resp
	 */
	private void doGet(String realUrl, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("请求类型: GET");

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
		
		String urlwithParam = "";
		
		try {
			// 获取请求参数的字符串
			Map<String, String> paramValues = getParamForHeader(realUrl);
			realUrl = paramValues.get("url");
			
			urlwithParam = realUrl + "?" + req.getQueryString();
			
			// 进行解码操作
			if (null != urlwithParam)
				urlwithParam = URLDecoder.decode(urlwithParam, "UTF-8");

		    Map<String, Object> map = toMap(urlwithParam);
			if (map != null) {
				for (Map.Entry<String, Object> entry : map.entrySet()) {
					urlwithParam = urlwithParam.replace((CharSequence) entry.getValue(),
							URLEncoder.encode((String) entry.getValue(), "UTF-8"));
				}
			}

			// 请求转发
			URL url = new URL(urlwithParam);
			
			conn = (HttpURLConnection) url.openConnection();

			conn.setRequestMethod("GET");
			
			if(!requestContentType.toString().equals("") ){
				conn.setRequestProperty("Content-Type", requestContentType.toString());
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
			HashMap<String, String> headerMap = Signature.computeSignatureHeaders(paasId, paasToken);
			if(paramValues.containsKey("serviceCode")) {
				headerMap.put("x-tif-signature", headerMap.get("x-tif-signature").toUpperCase());
				headerMap.put("x-tif-serviceId", paramValues.get("serviceCode"));
			}
			for(String key : headerMap.keySet()) {
				conn.setRequestProperty(key, headerMap.get(key));
			}
			logger.info("计算网关签名为:\n"+headerMap);
			
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
//			resp.setCharacterEncoding(requestCharset);
//			if(!requestContentType.toString().equals("") ){
//				resp.setContentType(requestContentType.toString());
//			}
			
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
			
			logger.info("\n请求地址: " + urlwithParam + "\n请求成功!");
		} catch (Exception e) {
			logger.error("请求地址: " + urlwithParam + "\n请求失败: " + e.toString(), e);
			
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
	
	/**
	 * 提取请求路径中的访问网关需要的请求参数
	 * @param url
	 * @return
	 */
	private Map<String, String> getParamForHeader(String url){
		String[] keywords = new String[] {"serviceCode" ,"paasId", "paasToken"};
		Map<String, String> paramValues = new HashMap<String, String>();
		String[] params = url.split("/");
		for(String param: params) {
			for(String keyword: keywords) {
				if(param.startsWith(keyword)) {
					paramValues.put(keyword, param.substring(keyword.length()));
					url = url.replace("/" + param, ""); //去除路径中的参数
					break;
				}
			}
		}
		
		paramValues.put("url", url);
		
		return paramValues;
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
	 * 处理POST请求
	 * @param req
	 * @param resp
	 */
	private void doPost(String realUrl, HttpServletRequest req, HttpServletResponse resp) {
		logger.info("请求类型: POST");
		
		OutputStream out = null;
		BufferedInputStream in = null;
		HttpURLConnection connection = null;
		
		try {
			InputStream indoc = req.getInputStream();

			// 获取请求类型与字符集
			String requestContent = req.getContentType();
			String requestCharset = req.getCharacterEncoding();
			StringBuffer requestContentType = new StringBuffer();
			if (null != requestContent) {
				requestContentType.append(requestContent);
				if (null != requestCharset) {
					requestContentType.append(";charset=").append(requestCharset);
				}
			}

			out = resp.getOutputStream();
			
			Map<String, String> paramValues = getParamForHeader(realUrl);
			realUrl = paramValues.get("url");
			
			// 转发请求
			URL url = new URL(realUrl);			
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", requestContentType.toString());
			
			connection.setDoInput(true);
			connection.setDoOutput(true);

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
				for(Map.Entry<String, String[]> entry: req.getParameterMap().entrySet()) {
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
			String responseContentType = connection.getContentType();
			String responseCharset = connection.getContentEncoding();

			// 将转发返回的类型与字符集设置到返回的参数中
			resp.setContentType(responseContentType);
			resp.setCharacterEncoding(responseCharset);

			// 读取响应信息，并将响应发送到客户端
			in = new BufferedInputStream(connection.getInputStream());
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
			
			logger.info("\n请求地址: " + realUrl + "\n请求成功!");
			
		} catch (Exception e) {
			logger.error("请求地址: " + realUrl + "\n请求失败!" + e.toString(), e);
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
