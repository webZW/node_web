package com.geostar.gmap.config;

import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.geostar.gmap.gservlet.ProxyHandler;

@Configuration
public class ServletConfigure {
	
	@Bean
    public ServletRegistrationBean<ProxyHandler> servletRegistrationProxyHandlerBean() {
        return new ServletRegistrationBean<ProxyHandler>(new ProxyHandler(), "/proxyHandler");
    }
}
