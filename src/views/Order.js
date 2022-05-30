import { connect } from 'react-redux';

function Order({ cart }) {
  return <div>zamowienie</div>;
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps)(Order);
