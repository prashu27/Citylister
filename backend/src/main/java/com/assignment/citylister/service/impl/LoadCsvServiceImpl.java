package com.assignment.citylister.service.impl;

import com.assignment.citylister.model.City;
import com.assignment.citylister.repository.CityRepository;
import com.assignment.citylister.service.LoadCsvService;
import com.assignment.citylister.utility.CsvUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.util.List;

@Service
@Slf4j
public class LoadCsvServiceImpl implements LoadCsvService {

    CityRepository cityRepository;

    @Value("${cities.filepath}")
    private String filepath;

    public LoadCsvServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    @Override
    public List<City> loadCityMetadata() throws FileNotFoundException {
        log.info("retrieving data from csv file");
        List<City> cityList = CsvUtil.mapCsvToList(filepath);
        cityList = cityRepository.saveAllAndFlush(cityList);
        log.info("Csv data loaded successfully to Database with total no of cities loaded {}", cityList.size());
        return cityList;
    }




    }



