import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios'; // temos que importar o módulo aqui também
import ProductCard from '../components/ProductCard';

jest.mock('axios')


const axiosResponseMock = {

    data: {
        title: "Fone",
        description: "Fone de qualidade",
        price: 250.00,
        thumbnail: 'url-fone'
    }
}

describe('Testando o ProductCard', () => {
    beforeEach(() => {
        axios.mockReset()
        // resetando o mock para garantir que os mokcs sempre vão iniciar como o original
    })

    test('Deve renderizar o ProductCard',  async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard/>)
        screen.logTestingPlaygroundURL()

        await waitFor(() => {})
        screen.logTestingPlaygroundURL()
    })

    test('Deve renderizar apenas o Loading',  async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard/>)
        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()
        const text = screen.queryByText('Fone')
        expect(text).not.toBeInTheDocument()
        screen.logTestingPlaygroundURL()

        await waitFor(() => {})
    
        screen.logTestingPlaygroundURL()
    })

    test('Deve renderizar o título, imagem, descrição e o preço.', async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<ProductCard/>)

        await waitFor(() => {})

        const title = screen.getByRole('heading', {name: /fone/i})
        const image = screen.getByRole('img', {name: /thumbnail for fone/i})
        const description = screen.getByText(/fone de qualidade/i)
        const price = screen.getByText(/\$250/i)
        const loading = screen.queryByText('Loading')

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(description).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(loading).not.toBeInTheDocument()

    })

    
})