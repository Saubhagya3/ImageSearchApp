import React from 'react'
import DataList from './DataList'
import url from './Url'
import { screen, render } from '@testing-library/react' 
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

const dataResponse = rest.get(url, (req, res, ctx) => {
    return res(ctx.json([{ 
        albumId: 1, 
        id: 1, 
        title: "test title", 
        url: "url.test.com", 
        thumbnailUrl: "thumbnailUrl.test.com" 
    }]))
})

const errorResponse = rest.get(url, (req, res, ctx) => {
    return res(ctx.status(500))
})

const server = new (setupServer as any)(dataResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Test to see if data title shows up on data list table component", async () => {
    render(<DataList />);
    const listItem = await screen.findByText("test title");
    expect(listItem).toBeVisible();
})

test("Test to see if error message is handled", async () => {
    server.use(errorResponse)
    render(<DataList />);
    const listItem = await screen.findByText("Can't reach the server...");
    expect(listItem).toBeVisible();
})