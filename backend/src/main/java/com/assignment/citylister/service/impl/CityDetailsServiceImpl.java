package com.assignment.citylister.service.impl;

import com.assignment.citylister.exception.CityNotFoundException;
import com.assignment.citylister.model.City;
import com.assignment.citylister.repository.CityRepository;
import com.assignment.citylister.service.CityDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CityDetailsServiceImpl implements CityDetailsService {

    CityRepository cityRepository;

    public CityDetailsServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }


    @Override
    public List<City> getCityByName(String name) {
        log.info("Getting City data from repository");
        List<City> cities = cityRepository.findByNameContainsIgnoreCase(name);
        if (cities.isEmpty()) {
            throw new CityNotFoundException(name);
        }
        return cities;
    }

    @Override
    public List<City> listAllCities() {
        log.info("get all cities data");
        List<City> cityList = cityRepository.findAll();
        if (cityList.isEmpty()) {
            throw new CityNotFoundException();
        }
        return cityList;
    }

    @Override
    public City editCityDetails(long id, City city) {
        cityRepository.findById(id).
                orElseThrow(() -> new CityNotFoundException(id));
        try {
            city = cityRepository.saveAndFlush(city);
        } catch (Exception ex) {
            log.error("Exception while saving data to Db with error: " + ex.getMessage());
        }
        return city;
    }

    @Override
    public City getCityById(Long id) {
        return cityRepository.findById(id).orElseThrow(() -> new CityNotFoundException(id));
    }
}
