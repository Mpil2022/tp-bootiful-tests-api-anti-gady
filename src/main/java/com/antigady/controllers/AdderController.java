package com.antigady.controllers;

import com.antigady.services.AdderService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping(value = "/adder", produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class AdderController {

    private final AdderService adderService;

    public AdderController(AdderService adderService) {
        this.adderService = adderService;
    }

    @GetMapping("/current")
    public int currentNum() {
        return adderService.currentBase();
    }

    @PostMapping
    public int add(@RequestParam int num) {
        return adderService.add(num);
    }

    @PostMapping("/current")
    public int accumulate(@RequestParam int num){
        return adderService.accumulate(num);
    }
}
