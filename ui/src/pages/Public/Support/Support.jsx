import svg from '@/assets'

import LayoutPublic from '@/components/Layout/UserLayout/Public/LayoutPublic'
import './Support.scss'

function Support() {
  document.title = 'Hỗ trợ - OmiOmi'
  return (
    <LayoutPublic>
      <div className='sp-bg'>
        <img
          src='https://e1.pxfuel.com/desktop-wallpaper/388/894/desktop-wallpaper-promare-night-city-3840x2160-pink-city.jpg'
          alt=''
        />
      </div>
      <div className='hang2'>Bạn Đang Cần Hỗ Trợ?</div>

      <div className='hang6'>
        <div className='hang4'>
          <a href='#Using' className='ov1 an'>
            <img src={svg.nd} alt='nd' with={300} />
            <p className='text2'> Cách sử dụng OmiOmi</p>
          </a>
          <a href='#Create_Account' className='ov1 an'>
            <img src={svg.Cv} alt='Cv' with={100} />
            <p className='text2'> Cách tạo tài khoản</p>
          </a>
          <a href='#Privacy_Security' className='ov1 an'>
            <img src={svg.top} alt='top' with={100} />
            <p className='text2'>Quyền riêng tư và bảo mật</p>
          </a>
        </div>
        <div className='hang5'>
          <a href='#Policy_Reporting' className='ov1 an'>
            <img src={svg.Scac} alt='Scac' with={100} />
            <p className='text2'>Chính sách và báo cáo</p>
          </a>
          <a href='#Search_User' className='ov1 an'>
            <img src={svg.se} alt='se' with={100} />
            <p className='text2'>Tìm kiếm người dùng</p>
          </a>
          <a href='#Post_Document' className='ov1 an'>
            <img src={svg.pot} alt='pot' with={100} />
            <p className='text2'>Cách đăng bài</p>
          </a>
        </div>
      </div>
      <div className='noidung'>
        <br id='Using' />
        <h1 className='mt100'>* Cách sử dụng OmiOmi:</h1>
        <br />
        <p className='text2'>
          <h4>Bạn muốn sử dụng và truy cập OmiOmi?</h4>
          <div>
            <h3 className='text-df'>Bước 1:</h3> Truy cập vào{' '}
            <a href='http://localhost:3000'>
              <u>www.omiomi.com</u>
            </a>{' '}
            đây là đường link chính thức của OmiOmi.
            <img src='http://localhost:3000/link.png' alt='b1' className='m15' style={{ width: 1200 }} />
          </div>{' '}
          <div>
            <h3 className='text-df'>Bước 2:</h3> Ấn vào nút "Đăng nhập" góc trái phía trên trang{' '}
            <a href='/welcome' className='text-df'>
              Welcome
            </a>
            <br />
            <p className='text-df'>( !Khuyên bạn hãy đọc qua các điều khoản trước khi sử dụng mạng xã hội này!).</p>
          </div>{' '}
          <img src='http://localhost:3000/login.png' alt='b2' className='m15' />
          <div className='d-space-c'>
            <div>
              <h3 className='text-df'>Bước 3:</h3>
              <p>Nếu bạn có tài khoản, hãy nhập thông tin đăng nhập để tiếp tục.</p>
              <p>Nếu chưa có tài khoản, hãy bấm vào đăng ký, rồi điền đầy đủ thông tin để tiếp tục.</p>
            </div>
            <img src='http://localhost:3000/lg1.png' alt='b3' style={{ width: 550 }} />
          </div>
          <div className='d-space-c'>
            <div>
              <h3 className='text-df'>Bước 4:</h3>
              <p>
                Sau khi đăng nhập, bạn có thể giao lưu kết bạn với những người khác. Tương tác với các bài viết, bạn bè,
                tin nổi bật, ảnh hoặc có thể vào trang cá nhân của người khác, để biết thêm nhiều thông tin công khai
                của họ.
              </p>
            </div>
          </div>
          <p className='text-c mt15'>
            Khi bạn không đăng nhập, bạn vẫn có thể truy cập dưới danh nghĩa là khách. Tức là bạn được xem và không được
            sử dụng các chức năng khác được.
          </p>
        </p>
        <br />
        <br id='Create_Account' />
        <h1 className='mt100'>* Cách tạo tài khoản:</h1>
        <br />
        <div className='text2'>
          <p>
            {' '}
            Bạn muốn truy cập và đăng tải thông tin của bạn thì trước tiên bạn cần tạo tài khoản. Cách tạo tài khoản:
          </p>
          <p> 1: Đi đến OmiOmi và nhấp vào đăng ký</p>
          <p> 2: Nhập thông tin cần thiết ví dụ: Tên, ngày tháng năm sinh, sđt, email,...</p>
          <p> 3: Nhấp vào nút đăng ký</p>
          <p> 4: Bạn sẽ được chuyển đến trang đăng nhập</p>
          <p> 5: Nhập tên đăng nhập và mật khẩu</p>
          <p> 6: Nhấp vào nút đăng nhập</p>
          <p> 7: Bạn sẽ được chuyển đến trang cá nhân của bạn</p>
          <p> 8: Sau khi đăng ký, bạn có thể đăng nhập vào trang cá nhân của bạn bất cứ lúc nào</p>
          <br />
          <p> Nếu bạn gặp sự cố khi đăng nhập:</p>
          <p> 1: Bạn có thể đăng nhập sai mật khẩu hoặc tên đăng nhập</p>
          <p>
            {' '}
            2: Bạn có thể đăng nhập lại hoặc liên hệ với ad và gửi phản hồi cho chúng tôi để chúng tôi giúp bạn sử lý.
          </p>
        </div>
        <br id='Privacy_Security' />
        <h1 className='mt100'> * Quyền riêng tư và bảo mật:</h1>
        <br />
        <div className='text2'>
          <p>
            {' '}
            OmiOmi được xây dựng để đưa mọi người đến gần nhau hơn. Chúng tôi giúp bạn kết nối với bạn bè và gia đình,
            khám phá các sự kiện tại địa phương và tìm kiếm những nhóm cần tham gia. Chúng tôi nhận thấy mọi người sử
            dụng OmiOmi để kết nối, nhưng không phải ai cũng muốn chia sẻ tất cả mọi thứ với tất cả mọi người - ngay cả
            là chia sẻ với chúng tôi. Quan trọng là bạn có quyền lựa chọn dữ liệu của mình nên được sử dụng như thế nào.
            Đây là các nguyên tắc định hướng cách chúng tôi tiếp cận vấn đề quyền riêng tư tại OmiOmi.
          </p>
          <p>Chúng tôi trao cho bạn khả năng kiểm soát quyền riêng tư của mình</p>
          <p>
            Bạn có thể đưa ra các lựa chọn về quyền riêng tư sao cho phù hợp với bản thân. Chúng tôi muốn đảm bảo bạn
            biết các công cụ kiểm soát quyền riêng tư của mình nằm ở đâu và làm sao để điều chỉnh chúng.
          </p>
          <p>Chúng tôi thiết kế quyền riêng tư trong sản phẩm của mình ngay từ đầu</p>
          <p>Chúng tôi nỗ lực để giữ cho thông tin của bạn an toàn</p>
          <p>Bạn sở hữu và có thể xóa thông tin của mình</p>
          <p> Chúng tôi không ngừng cải thiện</p>
          <p>
            Chúng tôi không ngừng nỗ lực phát triển các biện pháp kiểm soát mới và thiết kế chúng sao cho thật rõ ràng
            với mọi người. Chúng tôi đầu tư vào nghiên cứu và hợp tác với các chuyên gia bên ngoài OmiOmi, bao gồm các
            nhà thiết kế, nhà phát triển, chuyên gia về quyền riêng tư cũng như các nhà quản lý.
          </p>
          <p>Chúng tôi hành động có trách nhiệm</p>
        </div>
        <br id='Policy_Reporting' />
        <h1 className='mt100'> * Chính sách và báo cáo:</h1>
        <br />
        <div className='text2'>
          <p>
            {' '}
            Để đảm bảo quyền lợi của bạn và bảo vệ người dùng không bị ảnh hưởng bợi những người dùng thiếu ý thức về
            nội dung bài viết hoặc hình ảnh, thậm chí là mạo danh. Chúng tôi đã cập nhật tính năng báo cáo bài viết và
            báo cáo tài khoản người dùng:
          </p>
          <br />
          <p>Cách báo cáo trang cá nhân:</p>
          <p>1.Đi đến trang cá nhân đó</p>
          <p>2.Nhấp vào nút ba chấm bên dưới ảnh bìa.</p>
          <p>3.Nhấp vào nút báo cáo.</p>
          <p>4.Nhập nội dung báo cáo và nhấp vào nút gửi.</p>
          <p>5.Bạn sẽ nhận được thông báo kết quả báo cáo.</p>
          <br />
          <p>Cách báo cáo trang bài viết:</p>
          <p>1.Đi đến trang bài viết đó</p>
          <p>2.Nhấp vào nút ba chấm bên cạnh bài viết hoặc ảnh đó .</p>
          <p>3.Nhấp vào nút báo cáo.</p>
          <p>4.Nhập nội dung báo cáo và nhấp vào nút gửi.</p>
          <p>5.Bạn sẽ nhận được thông báo kết quả báo cáo.</p>
        </div>
        <br id='Search_User' />
        <h1 className='mt100'>* Tìm kiếm người dùng:</h1>
        <br />
        <div className='text2'>
          <p>Làm cách nào để tìm và thêm bạn bè trên OmiOmi</p>
          <p>1.Đi đến trang Home nhấp vào ô tìm kiếm phía trên cùng.</p>
          <p>2.Nhập tên người dùng cần tìm và nhấp vào nút tìm kiếm.</p>
          <p>3.Nhấp vào nút thêm bạn bè.</p>
          <p>4.Bạn sẽ nhận được thông báo kết quả tìm kiếm.</p>
        </div>
        <br id='Post_Document' />
        <h1 className='mt100'>* Cách đăng bài:</h1>
        <br />
        <div className='text2'>
          <p>Làm cách nào để đăng bài trên OmiOmi?</p>
          <p>1.Đi đến trang Home nhấp vào ô đăng bài.</p>
          <p>2.Nhấp vào nút đăng bài.</p>
          <p>3.Nhập nội dung bài viết và nhấp vào nút đăng bài.</p>
          <p>4.Bạn sẽ nhận được thông báo kết quả đăng bài.</p>
        </div>
      </div>
    </LayoutPublic>
  )
}

export default Support
