import styled from "styled-components";

import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import CabinRow from "./CainRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";


const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const {cabins, isCabinsLoading, isCabinsError} = useCabins();
  const [searchParams] = useSearchParams();

  if (isCabinsLoading) return <Spinner />;
  if (isCabinsError) return <Error message="Cabin could not be loaded" />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // 1) Filter cabins
  const filterValue = searchParams.get("discount") || "all";

  let filterdCabins;
  if (filterValue === "all") filterdCabins = cabins;
  if (filterValue === "no-discount") filterdCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount") filterdCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sort cabins
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filterdCabins.sort((a, b) => {
    if (a[field] === b[field]) return 0;
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
  });

  return (
    <Menus>
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.6fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={sortedCabins} 
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          )}
        />
    </Table>
    </Menus>
  );
}

export default CabinTable;
