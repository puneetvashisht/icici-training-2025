package com.icici.spring_api_gateway_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class SpringApiGatewayAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringApiGatewayAppApplication.class, args);
	}



	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("trip-booking-app", r -> r.path("/trip-booking/**")
						.uri("lb://trip-booking-app"))
				.route("trip-app", r -> r.path("/api/trips/**")
						.uri("lb://trip-app"))
				.build();
	}

}
