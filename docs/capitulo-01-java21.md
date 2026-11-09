# Capítulo 01 - Java 21 Esencial (AutoCare 360)

## 1. Entidades Elegidas
- **Tabla padre (1):** `cliente`
- **Tabla dependiente (N):** `vehiculo`
- **Relación:** 1 Cliente tiene muchos Vehículos (1:N)
- **FK en la base:** `vehiculo.cliente_id -> cliente.cliente_id`

## 2. Clases Java Implementadas
- `Cliente.java`: Representa al propietario, encapsula una colección `List<Vehiculo>` inmutable y métodos de negocio.
- `Vehiculo.java`: Representa el vehículo en taller, valida obligatoriedad de placa y tipo en el constructor.
- `TipoVehiculo.java`: Enum para el dominio cerrado de tipos (`AUTO`, `MOTO`, `CAMIONETA`, `SUV`).
- `ClienteRepository.java`: Interfaz de contrato que expresa qué operaciones se requieren sin acoplarse a tecnologías de persistencia.

## 3. Decisiones de Diseño
- **¿Por qué usamos enum?** Para evitar cadenas de texto arbitrarias y garantizar que solo se manejen tipos válidos de vehículos.
- **¿Por qué la colección es privada?** Para proteger la encapsulación y evitar que código externo altere la lista sin pasar por el método de negocio `agregarVehiculo()`.
- **Frontera técnica respetada:** En este capítulo no se utilizaron `@Entity`, Spring Boot ni conexiones a base de datos.
