import { Divider, Flex, Tag, Typography } from 'antd'

const CoinInfoModal = ({ coin }) => {
    return (
        <>
            <Flex align="center" alt=" ">
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                <Typography.Title level={3} style={{ margin: 0 }}>({coin.symbol}) {coin.name}</Typography.Title>
            </Flex>

            <Divider />

            <Typography.Paragraph>
                <Typography.Text ctrong>1 hour: </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text ctrong>1 day: </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text ctrong>1 week: </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text ctrong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text ctrong>marketCap: </Typography.Text>
                {coin.marketCap}$
            </Typography.Paragraph>

            <Typography.Paragraph>
                <Typography.Text ctrong>totalSupply: </Typography.Text>
                {coin.totalSupply}$
            </Typography.Paragraph>

            {coin.contractAddress && <Typography.Paragraph>
                <Typography.Text ctrong>contractAddress: </Typography.Text>
                {coin.contractAddress}
            </Typography.Paragraph>}
        </>
    )
}

export default CoinInfoModal;