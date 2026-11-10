import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MetricCard } from './MetricCard';

describe('MetricCard Component', () => {
    it('renderiza la etiqueta y el valor numérico correctamente', () => {
        render(<MetricCard label="Clientes Activos" value={12} helper="Registrados" />);

        expect(screen.getByText('Clientes Activos')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('Registrados')).toBeInTheDocument();
    });
});