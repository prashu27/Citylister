package com.assignment.citylister.controller;

import com.assignment.citylister.model.City;
import com.assignment.citylister.utility.CsvUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.io.FileNotFoundException;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class CityControllerAcceptanceTest {

    @Autowired
    MockMvc mockMvc;

    String baseUrl = "/api/cities";
    @Autowired
    ObjectMapper objectMapper;


    @Test
    void shouldGetCitiesByName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/").queryParam("name", "tokyo")).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldFaildGetCitiesByName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/").queryParam("name", " ")).andExpect(MockMvcResultMatchers.status().isBadRequest());


    }

    @Test
    void shouldGetCitiesById() throws Exception {
        long id = 1L;
        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/" + id)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void shouldFailGetCitiesById() throws Exception {
        long id = 1001L;
        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl + "/" + id)).andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void ShouldEditCity() throws Exception {
        long id = 1L;
        City c = new City(1L, "abc", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png");
        String JsonRequestObj = objectMapper.writeValueAsString(c);
        mockMvc.perform(MockMvcRequestBuilders.put(baseUrl + "/" + id).content(JsonRequestObj).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(MockMvcResultMatchers.status().isAccepted());
    }

    @Test
    void ShouldFailEditCity() throws Exception {
        long id = 1L;
        City c = new City(1L, " ", "://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png");
        String JsonRequestObj = objectMapper.writeValueAsString(c);
        String exception = mockMvc.perform(MockMvcRequestBuilders.put(baseUrl + "/" + id).content(JsonRequestObj).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(MockMvcResultMatchers.status().isBadRequest()).andReturn().getResolvedException().getClass().getName();
        assertTrue(StringUtils.contains(exception, "MethodArgumentNotValidException"));

    }

    @Test
    void ShouldFailEditCity404() throws Exception {
        long id = 1L;
        City c = new City(10001L, " ", "://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png");
        String JsonRequestObj = objectMapper.writeValueAsString(c);
        mockMvc.perform(MockMvcRequestBuilders.put(baseUrl + "/" + id).content(JsonRequestObj).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(MockMvcResultMatchers.status().is4xxClientError());
    }

    @Test
    void ShouldGetAllCities() throws Exception {
        List<City> cityList = getMockAllCity();
        mockMvc.perform(MockMvcRequestBuilders.get(baseUrl).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(MockMvcResultMatchers.status().is2xxSuccessful()).andExpect(jsonPath("$.size()", is(cityList.size())));

    }


    private List<City> getMockAllCity() throws FileNotFoundException {
        return CsvUtil.mapCsvToList("classpath:cities.csv");
    }
}