package com.naguit.student;

import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<com.naguit.student.Student, Integer> {
}