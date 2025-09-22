fn main() -> Result<(), Box<dyn std::error::Error>> {
	let proto_root = std::path::Path::new("../../proto");
	let market = proto_root.join("trading/v1/market.proto");
	let trade = proto_root.join("trading/v1/trade.proto");
	let out = std::path::Path::new("src/pb");
	std::fs::create_dir_all(out)?;
	tonic_build::configure()
		.out_dir(out)
		.compile_protos(&[market, trade], &[proto_root])?;
	Ok(())
}


