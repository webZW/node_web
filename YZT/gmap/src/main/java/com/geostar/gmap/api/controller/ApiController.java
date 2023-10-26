package com.geostar.gmap.api.controller;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.geostar.gmap.tif.Signature;

@RestController
@RequestMapping("/api")
public class ApiController {

	private final static Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	@RequestMapping(value="/signature",method = RequestMethod.POST)
	public Map<String, String> signature(@RequestParam(name="paasId") String paasId,
			@RequestParam(name="passToken") String passToken) {
		Map<String, String> sigMap = new HashMap<String, String>();
		try {
			sigMap = Signature.computeSignatureHeaders(paasId, passToken);
		} catch (Exception e) {
			e.printStackTrace();
			sigMap.put("error", e.toString());
			logger.error(e.getMessage());
		}
		return sigMap;
	}
}
