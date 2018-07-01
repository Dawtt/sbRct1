package com.basementtrolls.usertools;


import com.basementtrolls.payroll.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;


/*
v.1 this repository extends Spring Data Commons' CrudRepository and plugs in the type of the domain object and its primary key
v.2 To get underway with using frontend hypermedia controls, you need to turn on some extra controls. Spring Data REST provides paging support.
*/

public interface ArtistRepository extends PagingAndSortingRepository<Employee, Long> {

}