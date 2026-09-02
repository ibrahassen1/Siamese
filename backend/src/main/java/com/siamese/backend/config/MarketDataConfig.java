package com.siamese.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MarketDataConfig {

    @Value("${market-data.api-key}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}