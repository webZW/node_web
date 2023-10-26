package com.geostar.gmap.gservlet;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 数据中台模式使用的配置
 * 
 * @author maxiaofeng
 *
 */
@Component
@ConfigurationProperties(prefix = "bus")
public class BusConfig extends GatewayConfig{}
