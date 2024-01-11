import svg from '@/assets'
import LayoutPublic from '@/components/Layout/UserLayout/Public/LayoutPublic'
import '../Welcome/welcome.scss'
import './Standard.scss'

function Standard() {
  return (
    <LayoutPublic>
      <div className='thanh2 d-col-c'>
        <div className='thanh1'></div>
        <div className='tieude'>Quy Chuẩn Cộng Đồng</div>
      </div>
      <div className='container '>
        <div className='d-space-c'>
          <div className='tong'>
            <p className='font1 text-c'> Cách chúng tôi xét duyệt nội dung cộng đồng</p>
            <br></br>
            <div className='font2'>
              <p>
                Chúng tôi áp dụng các biện pháp kiểm soát sau để đảm bảo an toàn cho mọi người khi họ chia sẻ nội dung.
              </p>
              <br></br>
              <b> Tiêu chuẩn cộng đồng</b>
              <br></br>
              <p>
                Chúng tôi thực thi Tiêu chuẩn cộng đồng đối với nội dung mà cá nhân có thể chia sẻ trên OmiOmi.Tiêu
                chuẩn của chúng tôi áp dụng đối với mọi loại nội dung khi đăng tải.
              </p>
              <br></br>
              <p>
                Chúng tôi đã thiết kế Tiêu chuẩn mang tính toàn diện. Ví dụ: những nội dung không bị xem là ngôn từ gây
                thù ghét vẫn có thể bị gỡ vì vi phạm chính sách về bắt nạt của chúng tôi.
              </p>
            </div>
            <br></br>
            <b className='font3'>Tiêu chuẩn công nghệ</b>
            <br></br>
            <div className='font2'>
              <p>
                Chúng tôi sử dụng và đầu tư về mặt trí tuệ nhân tạo, tuy nhiên tính năng này đang được phát triển chưa
                thực sự hoàn chỉnh.
              </p>
              <br></br>
              <p>Tuy nhiên sẽ có mọt số trường hợp sẽ phải cần đến admin tham gia vào quá trình xét duyệt nội dung.</p>
            </div>
            <br></br>
            <b className='font3'>Tiêu chuẩn ngôn từ</b>
            <br></br>
            <div className='font2'>
              <p>
                Ngôn từ được sử dụng ở cả tên tài khoản đến cả nội dung trong bài đăng cần được suer dụng một các văn
                minh. Nếu trong bào viết có các ngôn từ phản cảm, có nội dung hướng tới bạo lực,.. thì bài viết sẽ bị
                báo cáo.
              </p>
              <br></br>
              <p>
                <br></br>
                Các trường hợp bị báo cáo thông tin về bài viết sẽ gửi về pía admin sử lý. Có thể là cảnh cáo cũng có
                thể sẽ là ban tài kgoanr vĩnh viễn,..
              </p>
            </div>
            <br></br>
            <b className='font3'>Tiêu chuẩn hình ảnh</b>
            <br></br>
            <p className='font2'>
              {' '}
              Về hình ảnh cũng tương tự như nội dung bài viết, hình phạt và cách giải quyết cũng tương tụ.
            </p>
          </div>
          <img src={svg.stop} alt='stop' width={400} />
        </div>
      </div>
    </LayoutPublic>
  )
}

export default Standard
