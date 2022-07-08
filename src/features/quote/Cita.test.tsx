import { renderHook, waitFor, screen, fireEvent, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import Cita from "./Cita";
// import obtenerCita from "./citaAPI";
import generateHandlers  from "../../mocks/cita";
import { render as customRender } from "../../test-utils";

const { handlers, data } = generateHandlers();
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Cita component', () => {

  it('should render correctly', () => {
    customRender(<Cita/>);
    expect(screen.getByPlaceholderText('Ingresa el nombre del autor'));
    
  })

  it('should change the value of the input', () => {
    customRender(<Cita/>)
    const searchInput = screen.getByPlaceholderText('Ingresa el nombre del autor');
    fireEvent.change(searchInput, { target: { value: 'Homer' } });
    expect(searchInput as HTMLInputElement).toHaveValue('Homer');
  })

  it('should render a quote', async () => {
    customRender(<Cita/>)
    const quoteMessage = screen.getByText('No se encontro ninguna cita');
    const searchButton = screen.getByText('Obtener cita aleatoria');
    fireEvent.click(searchButton);
    expect(quoteMessage).toHaveTextContent('CARGANDO...');
  })

  it('should clear the input', () => {
    customRender(<Cita/>)
    const searchInput = screen.getByPlaceholderText('Ingresa el nombre del autor');
    fireEvent.change(searchInput, { target: { value: 'Homer' } });
    const clearButton = screen.getByText('Borrar');
    fireEvent.click(clearButton);
    expect(searchInput as HTMLInputElement).toHaveValue('');
  })

  // xit('api', async () => {
  //   const hook = renderHook(() => obtenerCita());
  //   await waitFor(() => {
  //     expect(hook.result.current.data).toEqual(data);
  //   })
  // })
})