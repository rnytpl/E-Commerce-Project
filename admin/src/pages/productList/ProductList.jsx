import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, deleteProduct } from "../../store/productSlice";
import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";

export const ProductList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { products, isLoading } = useSelector((state) => state.product);
  const token = currentUser.accessToken;
  const handleDelete = (id) => {
    dispatch(deleteProduct({ id, token }));
  };

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, [dispatch, token]);

  if (isLoading) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
};
