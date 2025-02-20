package com.example.spring.ctrl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCtrl {

  @Value("${spring.application.name}")
  String name = "World";

  @GetMapping("/")
  public String healthCheck() {
    return "Hello from " + name;
  }
}
