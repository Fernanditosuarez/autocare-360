package com.autocare360.shared.infrastructure.adapter.in.web;

import com.autocare360.cliente.domain.exception.ClienteDuplicadoException;
import com.autocare360.cliente.domain.exception.ClienteNoEncontradoException;
import com.autocare360.cliente.domain.exception.DocumentoIdentidadDuplicadoException;
import com.autocare360.shared.infrastructure.adapter.in.web.dto.ApiError;
import com.autocare360.vehiculo.domain.exception.VehiculoDuplicadoException;
import com.autocare360.vehiculo.domain.exception.VehiculoNoEncontradoException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Manejo de 404 Not Found (Recurso no encontrado)
    @ExceptionHandler({ClienteNoEncontradoException.class, VehiculoNoEncontradoException.class})
    public ResponseEntity<ApiError> handleNotFound(RuntimeException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI(), Map.of());
    }

    // 2. Manejo de 409 Conflict (Violación de reglas de unicidad/negocio)
    @ExceptionHandler({
            ClienteDuplicadoException.class,
            DocumentoIdentidadDuplicadoException.class,
            VehiculoDuplicadoException.class
    })
    public ResponseEntity<ApiError> handleConflict(RuntimeException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request.getRequestURI(), Map.of());
    }

    // 3. Manejo de 400 Bad Request (Fallo en Bean Validation @Valid en Request DTOs)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidationErrors(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> fieldErrors = new HashMap<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }
        return buildResponse(HttpStatus.BAD_REQUEST, "Error de validacion en los datos de entrada", request.getRequestURI(), fieldErrors);
    }

    // 4. Manejo de 500 Internal Server Error (Errores no controlados o inesperados)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Ha ocurrido un error inesperado en el servidor", request.getRequestURI(), Map.of());
    }

    private ResponseEntity<ApiError> buildResponse(HttpStatus status, String message, String path, Map<String, String> fieldErrors) {
        ApiError error = new ApiError(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                path,
                fieldErrors
        );
        return ResponseEntity.status(status).body(error);
    }
}