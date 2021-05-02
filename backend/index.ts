import server from './src/servet'

const app = server()

app.listen(8080, () => console.info('runing'))
