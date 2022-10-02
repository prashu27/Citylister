package com.assignment.citylister.controller;

import com.assignment.citylister.model.City;
import com.assignment.citylister.service.CityDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@RestController
@RequestMapping("api/cities")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Validated
public class CityController {
    @Autowired
    CityDetailsService cityDetailsService;

    @GetMapping("")
    public ResponseEntity<List<City>> getAllCities() {
        log.info("Received request for  getAll Cities");
        List<City> cities = cityDetailsService.listAllCities();
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @GetMapping(value = "/", params = {"name"})
    public ResponseEntity<List<City>> getCitiesByName(@NotBlank @RequestParam("name") String name) {
        log.info("Received communication request for city by {}", name);
        List<City> cities = cityDetailsService.getCityByName(name);
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCitiesById(@PathVariable Long id) {
        log.info("Received communication request for city by {}", id);
        City city = cityDetailsService.getCityById(id);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> editCity(@PathVariable long id, @Valid @RequestBody City city) {
        log.info("Received edit city details request for city id : {} and RequestObject : {}", id, city);
        City updatedCity = cityDetailsService.editCityDetails(id, city);
        log.info("edite city request completed and updated object: {}", updatedCity);
        return new ResponseEntity<>(updatedCity, HttpStatus.ACCEPTED);
    }


}
