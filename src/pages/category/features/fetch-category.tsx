import { FC, useState, useEffect,useContext, Dispatch, SetStateAction } from "react";


import {
  CategoryDetail,
  CategoryResponse,
} from "../../../shared/types/wallpapers-type";
import categoryService from "../../../services/categoryService";
import ModalEditCategory from "../../../components/modal/modal-edit-category";
import { parseDate } from "../../../shared/utils/parseDate";
import { CategoryContext } from "../context/category-context";
interface CategoryProps {
  isCreateSuccess: boolean;
  keyword: string | undefined
}


const FetchCategory: FC<CategoryProps> = ({ isCreateSuccess, keyword }) => {

  const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [listPage, setListPage] = useState<number[]>([]);

  const {categories, setKeyword, getCategory} = useContext(CategoryContext)
  
  const handleClose = () => setIsOpenEdit(false);

  const handleEdit = (cateItem: CategoryDetail) => {
    setIsOpenEdit(true);
    setCategoryDetail(cateItem);
  };

  useEffect(() => {
    getCategory()
  }, [updateSuccess, isCreateSuccess]);

  return (
    <>
      <div className="grid grid-cols-4 mt-5 gap-5 overflow-y-auto max-h-[calc(65vh)] pr-4">
        {categories &&
          categories.map((item, index) => (
            <div key={index} className="bg-primary relative rounded w-full p-5">
              <p className="mb-2">{item.name}</p>
              <div
                className="relative w-full h-80 cursor-pointer bg-black flex justify-center"
                onClick={() => handleEdit(item)}
              >
                <img
                  src={item.path}
                  alt="Pic 1"
                  style={{
                    objectFit: "cover",
                    borderRadius: 5,
                    height: "100%",
                  }}
                />
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Chart Color: {item.chartColor}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Used: {item.useCount}
              </div>
              <div className="mt-3 text-gray-500 text-sm">
                Downloaded: {item.downloadCount}
              </div>
              <div className="mt-3 text-red-500 text-sm">
                Created at: {parseDate(item.createdAt)}
              </div>
            </div>
          ))}
      </div>
      {/* <div className="flex gap-5 mt-3 justify-end">
        {totalPages !== 0 && (
          <>
            <FormControl>
              <Select
                sx={{
                  backgroundColor: "#3b82f680",
                  height: 40,
                  color: "white",
                }}
                labelId="listPage"
                id="listPage"
                value={currentpage.toString()}
                onChange={handlePaging}
              >
                {listPage &&
                  listPage.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      Page {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <Select
                sx={{
                  backgroundColor: "#3b82f680",
                  height: 40,
                  color: "white",
                }}
                labelId="pageSize"
                id="pageSize"
                value={pageSize.toString()}
                onChange={handlePagingItem}
              >
                {LIST_PAGE_SIZE.map((item, index) => (
                  <MenuItem key={"item" + index} value={item}>
                    {item} items
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
      </div> */}
      {isOpenEdit && (
        <ModalEditCategory
          categoryDetail={categoryDetail}
          open={isOpenEdit}
          handleClose={handleClose}
          setUpdateSuccess={setUpdateSuccess}
        />
      )}
    </>
  );
};

export default FetchCategory;
