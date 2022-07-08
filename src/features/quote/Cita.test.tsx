import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers }  from "../../mocks/cita";
import { render, screen, fireEvent } from "../../test-utils";
import Cita from "./Cita";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Cita component', () => {

  it('should render correctly', () => {
    const { asFragment } = render(<Cita/>);
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByPlaceholderText('Ingresa el nombre del autor'));
  })

  it('should change the value of the input', () => {
    render(<Cita/>)
    const searchInput = screen.getByPlaceholderText('Ingresa el nombre del autor');
    fireEvent.change(searchInput, { target: { value: 'Homer' } });
    expect(searchInput as HTMLInputElement).toHaveValue('Homer');
  })

  it('should render a random quote', async () => {
		render(<Cita />);
		const searchButton = screen.getByText('Obtener cita aleatoria');
		await userEvent.click(searchButton);
		expect(await screen.findByText('Bart Simpson')).toBeInTheDocument()
	})

  it('should render a character quote', async () => {
		render(<Cita />);
		const searchInput = screen.getByPlaceholderText("Ingresa el nombre del autor")
		await userEvent.type(searchInput, 'Homer')
		const searchButton = screen.getByText('Obtener Cita');
		await userEvent.click(searchButton);
		expect(await screen.findByText('Homer Simpson')).toBeInTheDocument()
	})

  it('should render a error message', async () => {
		render(<Cita />);
		const searchInput = screen.getByPlaceholderText("Ingresa el nombre del autor")
		await userEvent.type(searchInput, '1')
		const searchButton = screen.getByText('Obtener Cita');
		await userEvent.click(searchButton);
		expect(await screen.findByText('Por favor ingrese un nombre válido')).toBeInTheDocument()
	})

  it('should clear the input', () => {
    render(<Cita/>)
    const searchInput = screen.getByPlaceholderText('Ingresa el nombre del autor');
    fireEvent.change(searchInput, { target: { value: 'Homer' } });
    const clearButton = screen.getByText('Borrar');
    fireEvent.click(clearButton);
    expect(searchInput as HTMLInputElement).toHaveValue('');
  })
})