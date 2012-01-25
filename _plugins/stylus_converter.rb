require 'shellwords'

module Jekyll
  class StylusConverter < Converter
    safe true
    
    def matches(ext)
      ext =~ /\.styl/i
    end
    
    def output_ext(ext)
      '.css'
    end
    
    def convert(content)
      begin
        command = Shellwords.escape content
        `echo #{command} | stylus --use nib`
      rescue => e
        puts "Stylus Exception: #{e.message}"
      end
    end
  end
end
