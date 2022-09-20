import { CollectionNft } from "../components/CollectionNft";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Collections = () => {
  const dummyData = [
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/ENS.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
    {
      bgImage:
        "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
      avatar: "https://assets.fractional.art/media/placeholder.png",
      title: "Zora",
      vault: 1211,
      NFTs: 1224,
    },
  ];
  return (
    <Container>
      <h2 className="mt-5">Top collections on solfraction</h2>
      <div className="bb my-4"></div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {dummyData.map((nft) => (
          <Col>
            <CollectionNft
              bgImage={nft.bgImage}
              avatar={nft.avatar}
              title={nft.title}
              vault={nft.vault}
              NFTs={nft.NFTs}
            ></CollectionNft>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collections;
