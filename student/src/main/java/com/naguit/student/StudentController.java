package com.naguit.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Controller
@RequestMapping(path="/naguit/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping
    public ResponseEntity createStudent(@RequestBody com.naguit.student.Student student) throws URISyntaxException {
        com.naguit.student.Student savedStudent = studentRepository.save(student);
        return ResponseEntity.created(new URI("/students/" + savedStudent.getId())).body(savedStudent);
    }

    @GetMapping
    public @ResponseBody Iterable<com.naguit.student.Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> getStudentById(@PathVariable Integer id) {
        Optional<com.naguit.student.Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        }

        return ResponseEntity.status(404).body("Student with id " + id + " not found");
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> updateStudent(@PathVariable Integer id, @RequestBody com.naguit.student.Student updated) {
        Optional<com.naguit.student.Student> existingOpt = studentRepository.findById(id);

        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Student with id " + id + " not found.");
        }

        com.naguit.student.Student existing = existingOpt.get();

        // Follow your Student entity fields exactly
        existing.setFirstname(updated.getFirstname());
        existing.setLastname(updated.getLastname());
        existing.setCourse(updated.getCourse());
        existing.setSection(updated.getSection());

        com.naguit.student.Student saved = studentRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteStudent(@PathVariable Integer id) {
        Optional<com.naguit.student.Student> student = studentRepository.findById(id);

        if (student.isPresent()) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok("Student with id " + id + " deleted.");
        }

        return ResponseEntity.status(404).body("Student with id " + id + " not found.");
    }

}
