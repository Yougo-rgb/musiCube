import { connectGanCube } from 'gan-web-bluetooth';

export async function connectCube() {
    try {
        const conn = await connectGanCube();

        return conn;
    } catch (e) {
        throw new Error("Failed to connect the cube: " + e);
    }
}