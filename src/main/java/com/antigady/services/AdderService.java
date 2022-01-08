package com.antigady.services;

import org.springframework.stereotype.Service;

/**
 * @author Richer Alexis
 * @version 1.0.0
 */

@Service
public class AdderService {

    private int num;

    public void baseNum(int base) {
        this.num = base;
    }

    public int currentBase() {
        return num;
    }

    public int add(int adder) {
        return this.num + adder;
    }

    public int accumulate(int adder) {
        return this.num += adder;
    }
}
