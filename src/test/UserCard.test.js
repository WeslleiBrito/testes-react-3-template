import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // temos que importar o módulo aqui também
import UserCard from '../components/UserCard';

jest.mock('axios') 

const axiosResponseMock = {
    data: {
        firstName: "Wesllei",
        lastName: "Brito",
        bank: {
            cardNumber: "3589640949470047",
            cardExpire: "15/10"
        }
    }
}

describe('Fixação', () => {

    beforeEach(() => {
        axios.mockReset()
        // resetando o mock para garantir que os mokcs sempre vão iniciar como o original
    })

    test('Deve iniciar com o loading e depois ele deve desaparecer da tela', async () => {

        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard/>)
        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        await waitFor(() => {})
        expect(loading).not.toBeInTheDocument()
        
        screen.logTestingPlaygroundURL()
    })

    test('Deve renderizar o nome, sobrenome, número de cartão e data de validade', async () => {

        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard/>)
        await waitFor(() => {})
        const name = screen.getByText(/wesllei brito/i)
        const lastName = screen.getByText(/brito/i)
        const numberCard = screen.getByText(/3589 6409 4947 0047/i)
        const validateDate = screen.getByText(/15\/10/i)

        expect(name).toBeInTheDocument()
        expect(lastName).toBeInTheDocument()
        expect(numberCard).toBeInTheDocument()
        expect(validateDate).toBeInTheDocument()
        
        screen.logTestingPlaygroundURL()


    })
})