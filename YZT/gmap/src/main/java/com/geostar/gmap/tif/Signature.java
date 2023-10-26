package com.geostar.gmap.tif;

import java.security.MessageDigest;
import java.util.Date;
import java.util.HashMap;

public class Signature {
	
	public static HashMap<String, String> computeSignatureHeaders(String paasId, String paasToken) throws Exception {
		if (paasId == null || paasId.isEmpty() || paasToken == null || paasToken.isEmpty()) {
			throw new Exception("paasId,paasToken must be set");
		}
		HashMap<String, String> map = new HashMap<String, String>();
		long now = new Date().getTime();
		String timestamp = Long.toString((long) Math.floor(now / 1000));
		String nonce = Long.toHexString(now) + "-" + Long.toHexString((long) Math.floor(Math.random() * 0xFFFFFF));
		map.put("x-tif-paasId", paasId);
		map.put("x-tif-timestamp", timestamp);
		map.put("x-tif-nonce", nonce);
		map.put("x-tif-signature", toSHA256(timestamp + paasToken + nonce + timestamp));
		return map;
	}
	
	protected static String toSHA256(String str) throws Exception {
		MessageDigest messageDigest;
		String encodeStr = "";
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(str.getBytes("UTF-8"));
			encodeStr = byte2Hex(messageDigest.digest());
		} catch (Exception e) {
			throw e;
		}
		return encodeStr;
	}

	// byte转换成16进制
	protected static String byte2Hex(byte[] bytes) {
		StringBuffer stringBuffer = new StringBuffer();
		String temp = null;
		for (int i = 0; i < bytes.length; i++) {
			temp = Integer.toHexString(bytes[i] & 0xFF);
			if (temp.length() == 1) {
				stringBuffer.append("0");
			}
			stringBuffer.append(temp);
		}
		return stringBuffer.toString();
	}
}
