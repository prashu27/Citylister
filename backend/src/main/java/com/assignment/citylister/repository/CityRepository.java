package com.assignment.citylister.repository;

import com.assignment.citylister.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

@EnableJpaRepositories
public interface CityRepository extends JpaRepository<City, Long> {

    List<City> findByName(String name);


    List<City> findByNameContainsIgnoreCase(String name);


}
