export default function GoogleMap() {
    return (
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.505695165155!2d78.00556369246046!3d30.308130689998546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39092a3aa4faaaab%3A0x5cfb994fe96add5f!2sDEV%20ENTERPRISES!5e0!3m2!1sen!2sin!4v1732052931687!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-md"
      />
    )
  }
  