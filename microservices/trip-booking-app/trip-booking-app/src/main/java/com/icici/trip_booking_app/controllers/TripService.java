package com.icici.trip_booking_app.controllers;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.icici.trip_booking_app.dto.Trip;

@FeignClient(name="MY-NODE-APP")
// @FeignClient(name="trip-app")
public interface TripService {
    @GetMapping("/api/trips/search/{title}")
    Trip getTripByTitle(@PathVariable String title);
}
