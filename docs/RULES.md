# API Guidelines:

## End Point Name:
 1. URL chỉ chứa tên Resources (danh từ số nhiều), không chứa động từ
 2. Sử dụng các HTTP methods khác nhau cho các hành động tương ứng.
 3. Không gọi dữ liệu related quá 2 cấp như: `/companies/3/employess/45/devices`
 4. Key trong data json trả về đặt tên sử dụng underscore, không dùng camelCase: `company_name`
 5. Ví dụ:
 - method `GET` với path `/companies`: trả về danh sách tất cả công ty
 - method `GET` với path `/companies/34`: trả về thông tin chi tiết của công ty có id 34
 - method `DELETE` với path `/companies/34`: sẽ xoá công ty có id 34
 - method `GET` với path `/companies/3/employees`: trả về danh sách nhân viên của công ty có id 3
 - method `GET` với path `/companies/3/employees/45`: trả về thông tin của nhân viên id 45 trong công ty id 3
 - method `DELETE` với path `/companies/3/employees/45`: xoá nhân viên id 45 trong công ty id 3
 - method `POST` với path `/companies`: sẽ tạo một công ty mới và trả lại thông tin chi tiết của công ty vừa được tạo
 - method `PUT`/`PATCH` với path `/companies/3`: sẽ update thông tin của công ty id 3
 
## Search, filter, sort, order, pagination: sử dụng method `GET`

### 1. Search:
`/companies?query=ShareRing`

### 2. Filter: 
`/companies?name=ShareRing&location=Vietnam`

### 3. Sort: sắp xếp theo thứ tự tăng dần hoặc giảm dần, mặc định là tăng dần(ASC)
`/companies?sort=ASC`, `/companies?sort=DSC`

### 4. Order: sắp xếp theo trường dữ liệu cụ thể, mặc định là theo id
`/companies?order=name`

### 5. Pagination: phân trang khi trả về danh sách
 - Cấu trúc file json trả về như sau, trường nào không có thì bỏ qua:
 ```
 {
    "total_pages": 5,
    "total_items": 45
    "page": 2,
    "total_per_page": 10
    "count": 10
    "url": "/companies?page=2"
    "next": "/companies?page=3"
    "previous": "/companies?page=1"
    "data": [ ... ]
 }
 ```
 - start page bắt đầu từ 1, page nằm ngoài giới hạn thì trả về data là 1 mảng rỗng. Nếu page lớn hơn page cuối thì `previous` sẽ hiển thị page cuối cùng, nếu page < 1 thì `next` sẽ hiển thị page 1.
  
## Error:
 - Nếu có lỗi xảy ra thì json data trả về định dạng như sau:
 ```
 {
    "error": {
        "code": "ER123",
        "message": "Data is not exist!"
    }
 }
 ```

## Default header:
 ### token: oauth token for authentication
 ### platform: thông tin platform để lấy đúng định dạng theo quy định, ví dụ platform là IOS/Android/Web sẽ trả về định dạng dữ liệu khác nhau. API `GET` cho `/companies/3` sẽ trả về như sau:
  - IOS: 
  ```
  {
    "name": "ShareRing",
    "location": "Vietnam",
    "employees": 12
  }
  ``` 
  - Android: 
  ```
  {
    "company_name": "ShareRing",
    "place": "Vietnam",
    "website": "https://sharering.vn"
  }
  ``` 
 ### lang: thông tin ngôn ngữ sử dụng khi trả về dữ liệu. Sử dụng khi hệ thống có đa ngôn ngữ. Ví dụ: lang=vn/en/fr
 
