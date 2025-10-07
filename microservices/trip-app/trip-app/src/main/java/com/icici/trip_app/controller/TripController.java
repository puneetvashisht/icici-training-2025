package com.icici.trip_app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import com.icici.trip_app.service.*;
import com.icici.trip_app.entity.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
	private KafkaTemplate<Object, Object> template;

    @Value("${server.port}")
    private int port;

    @Autowired
    private TripService tripService;

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        List<Trip> trips = tripService.getAllTrips();
        return ResponseEntity.ok(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        return tripService.getTripById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<Trip> searchTripsByTitle(@PathVariable String title) {
        Trip trip = tripService.searchTripsByTitle(title);
        trip.setPort(port);
        return ResponseEntity.ok(trip);
    }
    

    @PostMapping("/")
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        Trip createdTrip = tripService.createTrip(trip);
        
        createdTrip.setStarDate(LocalDate.now());
        createdTrip.setEndDate(LocalDate.now().plusDays(7)); // Set end date to 7 days later    

        this.template.send("quickstart-events", createdTrip);
        return ResponseEntity.status(201).body(createdTrip);
    }
}