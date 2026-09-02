package com.siamese.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siamese.backend.service.MarketDataService;

@RestController
public class MarketDataController {

    private final MarketDataService marketDataService;

    public MarketDataController(MarketDataService marketDataService) {
        this.marketDataService = marketDataService;
    }

    @GetMapping("/test-price")
    public String getTestPrice(@RequestParam String symbol) {
        return marketDataService.getPrice(symbol);
    }
}