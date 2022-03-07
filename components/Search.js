import { useState } from "react";
import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";

export function Search() {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpenModal = () => setIsVisible(true);
  const handleCloseModal = () => setIsVisible(false);
  return (
    <>
      <Text b onClick={handleOpenModal} css={{ cursor: "pointer" }}>
        Search
      </Text>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isVisible}
        onClose={handleCloseModal}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Search
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="number"
            id="modal-description"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="ID"
            helperText="Search by ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Spacer />
          <Text small>
            Remember this website only works between comics 2500 to 2587
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={handleCloseModal}>
            Close
          </Button>
          <Link href={`/comic/${search}`} passHref>
            <Button
              auto
              onClick={handleCloseModal}
              disabled={!(Number(search) >= 2500 && Number(search) < 2588)}
            >
              Find
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
