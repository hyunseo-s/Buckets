import { Container } from "@mantine/core"
import ItemCard, { ItemDetails } from "../components/ItemCard.tsx"

const items : ItemDetails[] = [{
  title: 'Hello',
  likes: 1,
  images: ['https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg', 'https://www.ramblers.com.au/wp-content/uploads/2017/04/dsc_0043_28150455396_o-1200x800.jpg'],
  link: 'https://www.ramblers.com.au/blog/sunset-skydives/'
}]

const MyBuckets = () => {
  return (
  <div>
    <Container size={325} >
      {items.map((item, index) => {
        return (
          <ItemCard key={index} title={item.title} likes={item.likes} images={item.images} link={item.link} />
        )
      })}
    </Container>
  </div>
  )
}

export default MyBuckets