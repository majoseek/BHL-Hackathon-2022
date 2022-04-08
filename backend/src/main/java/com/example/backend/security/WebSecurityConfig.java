package com.example.backend.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * Configures connection with frontend
     *
     * @param http the http security object
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(List.of(
                HttpMethod.GET.toString(),
                HttpMethod.POST.toString(),
                HttpMethod.OPTIONS.toString(),
                HttpMethod.PUT.toString(),
                HttpMethod.DELETE.toString())
        );

        http.csrf().disable().cors().configurationSource(request -> corsConfiguration);
    }
}
