package com.geostar.gmap.gservlet;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 智能网关模式使用的配置
 * 
 * @author maxiaofeng
 *
 */
@Component
@ConfigurationProperties(prefix = "gateway")
public class GatewayConfig {
	private String paasId;
	
	private String paasToken;

	public String getPaasId() {
		return paasId;
	}

	public void setPaasId(String paasId) {
		this.paasId = paasId;
	}

	public String getPaasToken() {
		return paasToken;
	}

	public void setPaasToken(String paasToken) {
		this.paasToken = paasToken;
	}
}
