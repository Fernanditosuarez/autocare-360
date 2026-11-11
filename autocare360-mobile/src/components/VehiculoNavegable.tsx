import React from 'react';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import type { Vehiculo } from '../models/parking';
import { VehiculoCard } from './VehiculoCard';

type Props = { vehiculo: Vehiculo; nombreCliente: string };

export function VehiculoNavegable({ vehiculo, nombreCliente }: Props) {
  return (
    <Link
      href={{ pathname: '/vehiculos/[id]', params: { id: String(vehiculo.id) } }}
      asChild
    >
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Ver detalle del vehículo ${vehiculo.placa}`}
      >
        <VehiculoCard vehiculo={vehiculo} nombreCliente={nombreCliente} />
      </Pressable>
    </Link>
  );
}
