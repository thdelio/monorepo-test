import { useEffect, useState } from 'react';
import type { InventoryItem } from '@erp/contracts';
import { fetchInventory } from './inventory.api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type LoadState = 'idle' | 'loading' | 'success' | 'error';

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle>{value}</CardTitle>
      </CardContent>
    </Card>
  );
}

export function InventoryHome() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string>('');
  const [state, setState] = useState<LoadState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadInventory = async () => {
    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetchInventory(10);

      setItems(response.inventory.items);
      setGeneratedAt(response.inventory.generatedAt);
      setState('success');
    } catch (error) {
      setState('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo obtener el inventario.',
      );
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState('loading');
      setErrorMessage('');

      try {
        const response = await fetchInventory(10);
        if (!active) {
          return;
        }

        setItems(response.inventory.items);
        setGeneratedAt(response.inventory.generatedAt);
        setState('success');
      } catch (error) {
        if (!active) {
          return;
        }

        setState('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'No se pudo obtener el inventario.',
        );
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main>
      <Card>
        <CardHeader>
          <div>
            <div>
              <Badge variant="secondary">API Web Proxy</Badge>
              <CardTitle>Inventario</CardTitle>
              <CardDescription>
                Lista en tiempo real consumida desde api-web y tipada con
                contratos compartidos.
              </CardDescription>
            </div>

            <Button
              type="button"
              onClick={() => {
                void loadInventory();
              }}
              disabled={state === 'loading'}
            >
              {state === 'loading' ? 'Actualizando...' : 'Recargar'}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {(state === 'success' || state === 'loading') && (
            <section>
              <StatCard label="Items" value={items.length} />
              <StatCard
                label="Stock total"
                value={items.reduce((total, item) => total + item.stock, 0)}
              />
              <StatCard
                label="Ultima actualizacion"
                value={
                  generatedAt ? new Date(generatedAt).toLocaleString() : '--'
                }
              />
            </section>
          )}

          {state === 'loading' && (
            <Card>
              <CardContent>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </CardContent>
            </Card>
          )}

          {state === 'error' && (
            <Alert variant="destructive">
              <AlertTitle>Error al cargar inventario</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {state === 'success' && (
            <Card>
              <CardContent>
                <Table>
                  <TableCaption>
                    Actualizado: {new Date(generatedAt).toLocaleString()}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead align="right">Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>#{item.id}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">
                          <Badge variant="outline">{item.stock}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
