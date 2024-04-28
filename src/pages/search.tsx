import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSearch } from "../services/search";
import '../assets/css/danhmuc.css';


interface Product {
  maSanPham: number;
  tenSanPham: string;
  gia: number;
  luotXem: number;
  dacBiet: boolean;
  anhDaiDien: string;
}

const Search = () => {
 
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const page = 1;
  const pageSize = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const result : any = await getSearch(page, pageSize, query); 
          setSearchResult(result.data);
        }
      } catch (error) {
        console.error("Error fetching search result:", error);
      }
    };
    fetchData();
  }, [query]);
  console.log(searchResult)

  return (
    <>
      <div id="ds_muasp">
        <div className="wrapper">
          <div className="dulieu">
            <h2>SẢN PHẨM</h2>
            {Array.isArray(searchResult)&& searchResult.length > 0?(
            searchResult.map((product, index) => (
              <div className="sanphamTC" key={index}>
                <div className="i">
                  <a href="#">
                    <img src={product.anhDaiDien} alt={product.tenSanPham} />
                  </a>
                </div>
                <div className="t">
                  <a href="#">{product.tenSanPham}</a>
                  <br />
                  <span className="thuoctinh">
                    <em className="gianiemiet">{product.gia}</em>
                  </span>
                  <span className="selebe">Sale</span>
                  <span className="view" style={{ color: "black" }}>
                    👁️{product.luotXem}
                  </span>
                </div>
              </div>
            )
          )
        ) : (
          <p>No search results found</p>
        )
      }
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;