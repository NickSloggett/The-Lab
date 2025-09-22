use tonic::{transport::Server, Request, Response, Status};

pub mod pb {
	include!(concat!(env!("CARGO_MANIFEST_DIR"), "/src/pb/trading.v1.rs"));
}

use pb::trading_server::{Trading, TradingServer};
use pb::{NewOrderSingle, OrderAck};

#[derive(Default)]
struct TradingSvc;

#[tonic::async_trait]
impl Trading for TradingSvc {
    async fn send_order(&self, _request: Request<NewOrderSingle>) -> Result<Response<OrderAck>, Status> {
        Ok(Response::new(OrderAck { client_order_id: "demo-1".into(), status: "NEW".into() }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
	tracing_subscriber::fmt().with_env_filter("info").init();
	let addr = "127.0.0.1:50051".parse()?;
	let trading = TradingSvc::default();
	tracing::info!(%addr, "starting gateway");
    Server::builder()
        .add_service(TradingServer::new(trading))
        .serve(addr)
        .await?;
	Ok(())
}


