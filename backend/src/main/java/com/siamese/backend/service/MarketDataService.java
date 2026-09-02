package com.siamese.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MarketDataService {

    private final RestClient restClient;

    @Value("${market-data.api-key}")
    private String apiKey;

    public MarketDataService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.twelvedata.com")
                .build();
    }

    public String getPrice(String symbol) {
        return restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/price")
                        .queryParam("symbol", symbol)
                        .queryParam("apikey", apiKey)
                        .build())
                .retrieve()
                .body(String.class);
    }
}