package com.example.OpenMind.Controller;

import com.example.OpenMind.Entity.Ejemplar;
import com.example.OpenMind.Service.EjemplarService;
import com.example.OpenMind.dto.EjemplarDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ejemplares")
public class EjemplarController {
    private final EjemplarService ejemplarService;

    public EjemplarController(EjemplarService ejemplarService) {
        this.ejemplarService = ejemplarService;
    }

    @PostMapping
    public EjemplarDTO crearEjemplar(@Valid @RequestBody EjemplarDTO ejemplar) {
        return ejemplarService.crearEjemplar(ejemplar);
    }

    @GetMapping
    public List<EjemplarDTO> listarEjemplares() {
        return ejemplarService.listarEjemplares();
    }

    @GetMapping("/{id}")
    public EjemplarDTO obtenerEjemplar(@PathVariable Long id) {
        return ejemplarService.obtenerEjemplarPorId(id);
    }

    @PutMapping("/{id}")
    public EjemplarDTO actualizarEjemplar(@PathVariable Long id,
                                       @Valid @RequestBody EjemplarDTO ejemplar) {
        return ejemplarService.actualizarEjemplar(id, ejemplar);
    }

    @DeleteMapping("/{id}")
    public void eliminarEjemplar(@PathVariable Long id) {
        ejemplarService.eliminarEjemplar(id);
    }
}
