package com.example.spring.ctrl;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HealthCtrl.class)
public class HealthCtrlTests {

  @Value("${spring.application.name}")
  String name = "World";

  @Autowired
  private MockMvc mockMvc;

  @Test
  void healthCheck_shouldReturnHelloFromAppName() throws Exception {
    mockMvc.perform(get("/"))
        .andExpect(status().isOk())
        .andExpect(content().string("Hello from " + name));
  }
}
